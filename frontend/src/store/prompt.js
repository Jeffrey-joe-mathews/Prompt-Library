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
        try {
            // Make the API request to fetch prompts
            const res = await fetch("/api/prompts");

            if (!res.ok) {
                // Handle the case when response is not OK
                const errorData = await res.json();
                return {
                    success: false,
                    message: errorData.message || "Failed to fetch prompts",
                };
            }

            // Parse the response data
            const data = await res.json();
            // Update the state with fetched prompts
            set({ prompts: data.data });

            return {
                success: true,
                message: "Prompts fetched successfully",
            };
        } catch (error) {
            // Handle any unexpected errors
            return {
                success: false,
                message: "An error occurred while fetching prompts",
            };
        }
    },
})) 