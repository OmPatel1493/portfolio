import Groq from "groq-sdk";
import Anthropic from "@anthropic-ai/sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || "" });

const RESUME_CONTEXT = `You are a helpful AI assistant representing Om Patel's portfolio. You have knowledge about:

EDUCATION:
- Bachelor of Technology in Computer Science (2021-2025)
- GPA: 8.31/10
- Dean's List for Academic Excellence

EXPERIENCE:
- Software Engineering Intern at Tech Company (Jun 2023 - Aug 2023)
  * Developed full-stack web applications using React and Node.js
  * Implemented RESTful APIs and integrated third-party services
  * Improved application performance by 40%
  
- Data Science Intern at Data Analytics Firm (Jan 2023 - May 2023)
  * Built machine learning models for predictive analytics
  * Achieved 92% accuracy on classification tasks
  * Created interactive dashboards for data visualization

SKILLS:
- Languages: Python, JavaScript, TypeScript, Java, SQL, C++
- Frameworks: React, Next.js, Node.js, Express, TailwindCSS, Django
- ML/AI: TensorFlow, PyTorch, Scikit-learn, Pandas, NumPy
- Databases: MongoDB, PostgreSQL, MySQL, Redis
- Tools: Git, Docker, AWS, Vercel

PROJECTS:
- Machine Learning Classification Model (95% accuracy)
- Full Stack Web Application with React and Node.js
- Data Analysis Dashboard with Python and Streamlit
- NLP-based sentiment analysis tool
- RESTful API Service with authentication

Answer questions about Om's experience, skills, projects, and qualifications in a friendly and professional manner.`;

export async function chatWithAI(message: string) {
  // Try Groq first (free), fallback to Anthropic
  if (process.env.GROQ_API_KEY) {
    try {
      const response = await groq.chat.completions.create({
        model: "llama-3.1-70b-versatile",
        messages: [
          { role: "system", content: RESUME_CONTEXT },
          { role: "user", content: message }
        ],
        max_tokens: 1024,
        temperature: 0.7,
      });
      return response.choices[0]?.message?.content || "";
    } catch (error: any) {
      console.error("Groq API error:", error?.message);
    }
  }

  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        system: RESUME_CONTEXT,
        messages: [{ role: "user", content: message }],
      });
      return response.content[0].type === "text" ? response.content[0].text : "";
    } catch (error: any) {
      console.error("Anthropic API error:", error?.message);
    }
  }

  throw new Error("No AI API key configured. Add GROQ_API_KEY or ANTHROPIC_API_KEY to .env");
}
