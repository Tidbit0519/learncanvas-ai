const feedback = async (openai, prompt, assistant, res) => {
	const thread = await openai.beta.threads.create();
	const message = await openai.beta.threads.messages.create(thread.id, {
		role: "user",
		content: prompt,
	});

	// Without streaming
	// let run = await openai.beta.threads.runs.createAndPoll(thread.id, {
	// 	assistant_id: assistant.id,
	// });

	// if (run.status === "completed") {
	// 	const messages = await openai.beta.threads.messages.list(run.thread_id);
	// 	return messages.data[0].content[0].text.value;
	// } else {
	// 	console.log(run.status);
	// }

	// With streaming
	const run = openai.beta.threads.runs
		.stream(thread.id, {
			assistant_id: assistant.id,
		})
        .on("textDelta", (textDelta, snapshot) => {
            console.log(textDelta.value);
			res.write(textDelta.value);
		})
		// .on("toolCallDelta", (toolCallDelta, snapshot) => {
		// 	if (toolCallDelta.type === "code_interpreter") {
		// 		if (toolCallDelta.code_interpreter.input) {
		// 			res.write(toolCallDelta.code_interpreter.input);
		// 		}
		// 		if (toolCallDelta.code_interpreter.outputs) {
		// 			res.write("\noutput >\n");
		// 			toolCallDelta.code_interpreter.outputs.forEach((output) => {
		// 				if (output.type === "logs") {
		// 					res.write(`\n${output.logs}\n`);
		// 				}
		// 			});
		// 		}
		// 	}
		// })
		.on("end", () => {
			res.end();
		});
};

export default feedback;
