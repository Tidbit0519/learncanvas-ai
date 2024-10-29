import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const feedback = async(input) =>{
	const chatCompletion = await getGroqChatCompletion(input);
	return chatCompletion.choices[0]?.message?.content || "";
}

async function getGroqChatCompletion(input) {
	return groq.chat.completions.create({
		messages: [
			{
				role: "system",
				content:
					"You will be a helpful tutor who is an expert in guiding students based on the assignment descriptions and rubrics. Using simple language, provide feedback and/or suggestions based on the assignment descriptions and/or rubrics given in the prompt. If appropriate, give an example about a different but similar subject. Format and organize your response nicely, and add a new line after each section.",
			},
			{
				role: "user",
				content: input,
			},
		],
		model: "llama3-8b-8192",
	});
}

export default feedback;
