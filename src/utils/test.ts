function decodeJWT(token: string) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch (error) {
    return null;
  }
}

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyaW5hQGdtYWlsLmNvbSIsImlhdCI6MTY5NzY1MDcyNSwiZXhwIjoxNjk3NjU0MzI1LCJzdWIiOiJ1c2VyLUtVakFwNyJ9.rElJ4ZW2cBUXq3OdvEf8WXuFoYUptp3aL4Ddv6iGQso";
const decoded = token ? decodeJWT(token) : null;
const expirationTimestamp = decoded ? decoded.exp : null;
const currentDate = new Date().getTime();
const userId = decoded.sub;
