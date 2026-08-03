// We generate the token request to re-use in all data altering tests
export async function getAuthToken(request) {
    const response = await request.post('https://restful-booker.herokuapp.com/auth', {
        data: {
            username: 'admin',
            password: 'password123'
        }
    });

    const body = await response.json();
    return body.token;
}