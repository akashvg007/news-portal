export default function loginfun(state) {
  const { userName, password } = state;
  const objStr = localStorage.getItem(userName + "");
  if (!objStr) {
    alert("Please Register first!");
    return false;
  }
  const obj = JSON.parse(objStr);
  if (obj.password === password) {
    alert("login Successfull");
    localStorage.setItem("userId", userName);
    return true;
  } else {
    alert("password is not valid!!");
  }
  return false;
}
export const registerfun = (state, validate) => {
  const { name, userName, password } = state;
  const objStr = JSON.stringify({ name, userName, password });
  if (localStorage.getItem(userName + "")) {
    alert("This account is already created please Login");
    return false;
  }
  if (!validate) {
    alert("Validation Error!!");
    return false;
  }
  localStorage.setItem(userName + "", objStr);
  return true;
};
