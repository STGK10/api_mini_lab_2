import {
  setFormValue, submitSignInForm, submitSignUpForm, validateEmail,
  validatePassword, validatePasswordRepeat, getValidationStatus,
  validateEmpty
} from "./utils.js"


////// ДЕМОНСТРАЦИОННЫЙ УЧАСТОК КОДА. На оценку не влияет, исключительно для саморазвития.

// Предлагаю "поиграться" с частями кода ниже, чтобы познакомиться с JS
// Получаем элемент и меняем его класс, который определеён в библиотеке стилей materialize
//const password = document.getElementById('password');
//password.classList.add("valid")
//password.classList.remove("valid")

// В браузере можно посмотреть, что из себя представляет документ
// (CTRL+SHIFT+i для открытия консоли и открыть вкладку "консоль", туда будет залогированно значение)
//console.log("Document")
//console.log(document)

// Если запросить id, которого нет в DOM дереве - вернется undefined
// => надо быть осторожней: коллега может поменять id вашего элемента и упадёт !ВАШ! код
// const first_name = document.getElementById('first_name_invalid');
// first_name.oninput = (e) => validatePassword(e)

// Селекция по классу. Может пригодится, для того, чтобы упростить обработку полей в двух формах.
// Чтобы не делать кучу уникальных айди, можно определённым полям формы давать один класс и обрабатывать их в цикле
// const passwords = document.querySelectorAll('.password')
// console.log(passwords)
// for (const password of passwords) {
//   password.style.background = "red"
// }

////// КОНЕЦ ДЕМОНСТРАЦИОННОГО УЧАСТКА КОДА. Дальше код для оцениваемой части задания


// Выписываем все айдишники HTMl-элементов в константы для переиспользования
const first_name_id = 'first_name'
const last_name_id = 'last_name'
const password_id = 'password'
const password_repeat_id = 'password-repeat'
const email_id = 'email'

const sign_in_link_id = 'sign_in_link'
const sign_up_form_id = 'sign_up_form'
// const sign_in_form_id = 'sign_in_form'  // Пригодится
const sign_up_btn_id = 'sign_up_btn'
const sign_in_form_id = 'sign_in_form'
const sign_in_email_id = 'sign_in_email'
const sign_in_password_id = 'sign_in_password'
const return_btn_id = 'return_btn'
const sign_in_btn_id = 'log_in_btn'

// Получаем элемент DOM-дерева по id и присваиваем значение аттрибуту oninput
// oninput вызывается с параметром "event" каждый раз, когда ввод меняется
// Значение, которое мы присваеваем этому аттрибуту - это функция, определённая в стрелочном стиле
// Гуглить по тегам "события JS", "onchange/oninput HTML", "стрелочные функции JS", ...

const first_name = document.getElementById(first_name_id);
//first_name.oninput = (e) => setFormValue(first_name_id, e.target.value)  // Установить значение без валидации
first_name.addEventListener('input', (e) => setFormValue(first_name_id, e.target.value, validateEmpty))  // Установить значение без валидации
const last_name = document.getElementById(last_name_id);
last_name.addEventListener('input', (e) => setFormValue(last_name_id, e.target.value, validateEmpty))
const email = document.getElementById(email_id);
//email.oninput = (e) => setFormValue(email_id, e.target.value, validateEmail) // Установить значение с валидацией
email.addEventListener('input', (e) => setFormValue(email_id, e.target.value, validateEmail)) 

const password = document.getElementById(password_id)
password.addEventListener('input', (e) => {
  setFormValue(password_id, e.target.value, validatePassword);
  password_repeat.value ? setFormValue(password_repeat_id, password_repeat.value, validatePasswordRepeat) : () => {}; 
})

const password_repeat = document.getElementById(password_repeat_id)
password_repeat.addEventListener('input', (e) => setFormValue(password_repeat_id, e.target.value, validatePasswordRepeat))

const sign_in_email = document.getElementById(sign_in_email_id)
sign_in_email.addEventListener('input', (e) => setFormValue(sign_in_email_id, e.target.value))

const sign_in_password = document.getElementById(sign_in_password_id)
sign_in_password.addEventListener('input', (e) => setFormValue(sign_in_password_id, e.target.value))


// Меняем стили объекта DOM дерева. Это позволяет скрыть форму регистрации и показать форму авторизации
// Объект формы не исключается из DOM дерева, а просто становистя невидимым
const switch_to_sign_in = document.getElementById(sign_in_link_id);
switch_to_sign_in.onclick = (e) => {
  document.getElementById(sign_up_form_id).style.display = "none"
  document.getElementById(sign_in_form_id).style.display = ""
}


const sign_up_btn = document.getElementById(sign_up_btn_id);
sign_up_btn.onclick = (e) => {
  // При нажатии кнопки в форме по умолчанию происходит перезагрузка страницы.
  // Чтобы отключить его, нужно отменить стандартное поведение события
  e.preventDefault()
  submitSignUpForm()
}

const sign_up_inputs = document.querySelectorAll('.sign-up')
console.log(sign_up_inputs)
for (const field of sign_up_inputs) {
  field.addEventListener('input', (e) => sign_up_btn.disabled = !getValidationStatus());
  setFormValue(field.id, field.value, validateEmpty);
  sign_up_btn.disabled = !getValidationStatus();
}


const return_btn = document.getElementById(return_btn_id)
return_btn.onclick = (e) => {
  document.getElementById(sign_up_form_id).style.display = ""
  document.getElementById(sign_in_form_id).style.display = "none"
}


const sign_in_btn = document.getElementById(sign_in_btn_id)
sign_in_btn.onclick = (e) => {
  e.preventDefault()
  submitSignInForm(sign_in_email_id, sign_in_password_id)
}


const sign_in_inputs = document.querySelectorAll('.sign-in')
const signInValues = {}
for (const field of sign_in_inputs) {
  signInValues[field.id] = field.value;
  setFormValue(field.id, field.value)
  field.addEventListener('input', (e) => {
    signInValues[field.id] = field.value;
    setFormValue(field.id, field.value)
    if (Object.values(signInValues).every((val) => String(val).length > 0))
      sign_in_btn.disabled = false;
    else
      sign_in_btn.disabled = true;
  })
}
sign_in_btn.disabled = !Object.values(signInValues).every((val) => String(val).length > 0);
