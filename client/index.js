const genres = document.querySelectorAll('.genre')

async function request () {
  const response = await fetch('/api/genres')
  const json = await response.json()

  console.log(json)
}

request()
