// Lesson Data
const lessons = [
    { title: "What is AI?", content: "AI stands for Artificial Intelligence. It helps computers think like humans." },
    { title: "How to Ask AI a Question?", content: "Be clear and specific when asking AI to get better responses." },
    { title: "AI in Everyday Life", content: "AI is used in chatbots, recommendations, and automation." }
];

// Load Lessons
const lessonContainer = document.getElementById("lesson-container");
lessons.forEach(lesson => {
    let div = document.createElement("div");
    div.className = "lesson";
    div.innerHTML = `<h3>${lesson.title}</h3><p>${lesson.content}</p>`;
    lessonContainer.appendChild(div);
});

// AI API Key (Replace with your OpenAI API key)
const OPENAI_API_KEY = "your_openai_api_key";

// Function to Get AI Response
async function getAIResponse() {
    let userInput = document.getElementById("user-input").value;
    let aiFeedback = document.getElementById("ai-feedback");

    if (!userInput) {
        aiFeedback.innerText = "Please enter a prompt!";
        return;
    }

    aiFeedback.innerText = "Thinking...";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [{ role: "user", content: userInput }]
        })
    });

    const data = await response.json();
    aiFeedback.innerText = data.choices[0].message.content;
}
