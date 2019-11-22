import { debounce } from 'lodash-es'

import Meal from './meal'

const apiEndPoint = 'https://www.themealdb.com/api/json/v1/1/search.php'

const searchInput = document.querySelector('.searchInput')
const recipeList = document.querySelector('.recipeList')

let previousInputValue = ''

const debouncedInputHandler = debounce(async ({ target: { value: inputValue } }) => {
  if (!inputValue) {
    return
  }

  if (previousInputValue === inputValue) {
    return
  }

  recipeList.innerHTML = '<h3>Loading...</h3>'

  // fetch(`${apiEndPoint}?f=${inputValue}`, {
  //   method: 'GET',
  // })
  // .then((response) => response.json())
  // .then(({ meals }) => {
  //   recipeList.innerHTML = meals
  //     .map((meal) => new Meal(meal))
  //     .map((mealInstance) => mealInstance.renderToString())
  //     .join('')
  // })
  // .catch(() => {
  //   recipeList.innerHTML = '<h3>An error has occurred when fetching data...</h3>'
  // })

  try {
    const response = await fetch(`${apiEndPoint}?f=${inputValue}`, {
      method: 'GET',
    })
    const { meals } = await response.json()

    recipeList.innerHTML = meals
      .map((meal) => new Meal(meal))
      .map((mealInstance) => mealInstance.renderToString())
      .join('')
  } catch {
    recipeList.innerHTML = '<h3>An error has occurred when fetching data...</h3>'
  }

  previousInputValue = inputValue
}, 1000)

searchInput.addEventListener('input', debouncedInputHandler)
