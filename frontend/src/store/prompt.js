import { create } from 'zustand'

export const usePromptLibrary = create((set) => ({
    prompts: [],
    setPrompts: (prompts) => set({prompts}),
    createPrompt: async (newPrompt) => {
        if(!newPrompt.name || !newPrompt.prompt || !newPrompt.image) {
            return {
                "success" : false,
                "message" : "PLease provide all the required fields"
            }
        }
        const res = await fetch("/api/prompts", {
            method: "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newPrompt)
        })
        if (!res.ok) {
        const errorData = await res.json();
        return {
            success: false,
            message: errorData.message || "Something went wrong"
            };
        }
        const data = await res.json();
        set((state) => ({prompts:[...state.prompts, data.data]}));
        return {
            "success" : true,
            "message" : "The Prompt has been created... Thank You ^w^"
        }
    },
    fetchPrompt: async () => {
        const res = await fetch("/api/prompts");
        const data = await res.json();
        set({ prompts:data.data });
    }
})) 