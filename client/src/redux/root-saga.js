import { all, call } from "redux-saga/effects";

import { menuSagas } from "./menu/menu.sagas";
import { userSagas } from "./user/user.sagas";
import { cartSagas } from "./cart/cart.sagas";
import { bookingSagas } from "./booking/booking.sagas";
import { employeeSagas } from "./employee/employee.sagas";
import { adminSagas } from "./admin/admin.sagas";

export default function* rootSaga() {
  yield all([
    call(menuSagas),
    call(userSagas),
    call(cartSagas),
    call(bookingSagas),
    call(employeeSagas),
    call(adminSagas),
  ]);
}
