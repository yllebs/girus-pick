exports.handler = async (event) => {
    console.log('Event received:', JSON.stringify(event, null, 2));

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hello from LocalStack Lambda!',
            input: event,
            environment: process.env.EXAMPLE_VAR || 'No environment variable set'
        }),
    };

    return response;
}; 