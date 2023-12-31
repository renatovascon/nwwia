import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")
  const videoUrl = input.value
  if (!videoUrl.includes("shorts")) {
    return (content.textContent = "Não é short")
  }
  const [_, params] = videoUrl.split("/shorts/")
  const videoId = params.split("?si")

  content.textContent = "Obtendo o texto do audio..."

  const trasncription = await server.get("/summary/" + videoId)
  content.textContent = "Realizando o resumo..."

  const summary = await server.post("/summary", {
    text: trasncription.data.result,
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})
