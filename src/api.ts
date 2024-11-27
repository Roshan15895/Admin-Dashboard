export const loginUser = async ( email: string, password: string ) => {
  try {
    const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:JlpFmq7N/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": email,
        "password": password
      }),
    });

    const data = await response.json();
    if (response.status == 200) {
      // Return success response
    
      return { success: true, data };
    } else {
      // Handle error
      return { success: false, message: data.message || 'Login failed' };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'An error occurred. Please try again.' };
  }
};