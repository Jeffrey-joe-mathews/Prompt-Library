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
                "Content-Type" : "application.json"
            },
            body: JSON.stringify(newPrompt)
        })
        const data = await res.json();
        set((state) => ({prompt:[...state.prompt, data.data]}))
    }
})) 