const blogPostIdeasPrompt = (topic) =>`
    Generate a list of 5 blog post ideas related to ${topic}.

for each blog post ides, return:
- a title
- a 2-line description about the post
- 3 relevant tags
- the toune (e.g., technical, casual, beginner-friendly, etc.)

Return the result as an array of JSON objects in this format:
[
    {
      "title": "",
      "description":"",
      "tags":["","",""],
      "tone":""
    }
]
    Important: Do NOT add any extra text outside the JSON format. Only return valid JSON.
`;

function generateReplyPrompt(comment){
    const authName = comment.author?.name || "User";
    const content = comment.content;

    return `You're replying to a blog comment by ${authName}. The comment says:
    
    "${content}"
    
    Write a thoughful, consise, and relevant reply to this comment.`;
}

const blogSummaryPrompt = (blogContent) => (`
    You are an AI assistant that summarizes blog posts.

    Instruction:
    - Read the blog post content below.
    - Generate a short, catchy, SEO-friedly title (max 12 words).
    - Write a clear, engaging summart of about 300 words.
    - At the end of the summary, add a markdown section titled **## What You'll Learn**.
    - Under that heading, list 3-5 key takeaways or skills the reader will learn in **bullet points** using marksown (\`-\`).

    Return the result in **valid JSON** with the following structure:

    {
    "title": "Short SEO-friendly title",
    "summary": "300-word summary with a markdown section for Wht You'll Learn"
    }

    Only return valid JSON. Don not include markdown or code blocks around the JSON.

    Blog Post Content:
    ${blogContent}
    `);

    module.exports = {blogPostIdeasPrompt, generateReplyPrompt, blogSummaryPrompt};