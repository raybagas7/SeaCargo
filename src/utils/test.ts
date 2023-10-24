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

console.log(decoded);

console.log(typeof userId);
console.log("currentDate", currentDate);
console.log("EXP", expirationTimestamp * 1000);

if (expirationTimestamp && currentDate > expirationTimestamp * 1000) {
  console.log("expired");
}

// need more improvement before implement this reusable function
// async function handleApiRequest(token, endpoint, method, body) {
//   const { showLoading, hideLoading } = useLoading.getState();

//   try {
//     showLoading();
//     const response = await fetch(endpoint, {
//       method,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `${token}`,
//       },
//       body: JSON.stringify(body),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       hideLoading();
//       return { success: true, data };
//     } else {
//       hideLoading();
//       const data = await response.json();
//       toastifyError(data.error);
//       return { success: false, error: data.error };
//     }
//   } catch (error) {
//     hideLoading();
//     toastifyError(String(error));
//     return { success: false, error: String(error) };
//   }
// }

// postAddress: async (token: string, payload: IAddressInput) => {
//   const { success, data } = await handleApiRequest("/api/addresses", "POST", {
//     address: payload.address,
//     province: payload.province,
//     province_id: payload.provCode,
//     city: payload.city,
//     city_id: payload.cityCode,
//     postal_code: payload.postalCode,
//     detail_address: payload.detailAddress,
//   });

//   if (success) {
//     set((state) => ({
//       addressData: state.addressData ? [...state.addressData, data] : [data],
//       edit: false,
//     }));

//     toastifySuccess(`New address added to your address list`);
//   }
// },
