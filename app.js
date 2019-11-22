import { debounce } from 'lodash-es'

const apiEndPoint = 'https://www.themealdb.com/api/json/v1/1/search.php'

const searchInput = document.querySelector('.searchInput')
const recipeList = document.querySelector('.recipeList')

let previousInputValue = ''

const debouncedInputHandler = debounce(({ target: { value: inputValue } }) => {
  if (!inputValue) {
    return
  }

  if (previousInputValue === inputValue) {
    return
  }

  fetch(`${apiEndPoint}?f=${inputValue}`, {
    method: 'GET',
  })
  .then((response) => response.json())
  .then((response) => {
    console.log(response)
  })

  previousInputValue = inputValue
}, 1000)

searchInput.addEventListener('input', debouncedInputHandler)
