import { test, expect } from '@playwright/test';
import { getAuthToken } from '../utils/auth';

// Shared across all tests in this file so each step can reuse the same booking
let bookingId;

// Serial: each test depends on the state left by the previous one (same booking record)
test.describe.serial('Booking CRUD flow', () => {

    // Runs once before all tests — creates the booking every other test will operate on
    test.beforeAll(async ({ request }) => {
        const response = await request.post('https://restful-booker.herokuapp.com/booking', {
            data: {
                firstname: 'John',
                lastname: 'Doe',
                totalprice: 150,
                depositpaid: true,
                bookingdates: {
                    checkin: '2024-01-01',
                    checkout: '2024-01-10'
                },
                additionalneeds: 'Breakfast'
            }
        });

        const body = await response.json();
        bookingId = body.bookingid; // saved for every following test to use
    });

    // No auth required — reading data is not a destructive operation
    test('get a specific booking', async ({ request }) => {
        const response = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`);

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.firstname).toBe('John');
        expect(body.lastname).toBe('Doe');
    });

    // Full update — requires a fresh token since it overwrites existing data
    test('update a booking', async ({ request }) => {
        const token = await getAuthToken(request);

        const response = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
            headers: {
                'Cookie': `token=${token}`
            },
            data: {
                firstname: 'Jane',
                lastname: 'Smith',
                totalprice: 200,
                depositpaid: false,
                bookingdates: {
                    checkin: '2024-02-01',
                    checkout: '2024-02-15'
                }
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.firstname).toBe('Jane');
        expect(body.lastname).toBe('Smith');
    });

    // Partial update — only firstname changes; lastname should still be 'Smith' from the PUT above
    test('partially update a booking', async ({ request }) => {
        const token = await getAuthToken(request);

        const response = await request.patch(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
            headers: {
                'Cookie': `token=${token}`
            },
            data: {
                firstname: 'Michael'
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.firstname).toBe('Michael');
        expect(body.lastname).toBe('Smith'); // confirms PATCH left untouched fields intact
    });

    // Eliminates previous orders — requires auth; RestfulBooker returns 201 (not 200) on success
    test('delete a booking', async ({ request }) => {
        const token = await getAuthToken(request);

        const response = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
            headers: {
                'Cookie': `token=${token}`
            }
        });

        expect(response.status()).toBe(201);
    });

    // Closes the loop — proves the DELETE above actually removed the resource
    test('verify booking was deleted', async ({ request }) => {
        const response = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`);
        expect(response.status()).toBe(404);
    });
});