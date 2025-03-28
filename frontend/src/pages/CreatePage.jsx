import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useColorModeValue } from '../components/ui/color-mode'
import { usePromptLibrary } from '../store/prompt.js'

const CreatePage = () => {

  const [newPrompt, setNewPrompt] = useState(
    {
      name : "",
      prompt : "",
      image : "",
    }
  )

  const [message, setMessage] = useState(
    {
      type : "",
      text : "",
    }
  )

  const showMessage = (type, text) => {
    setMessage({
      type:type,
      text:text,
    });
    setTimeout(() => {
      setMessage({type:"", text:""})
    }, 5000);
  };

  const handleAddPrompt = async() => {
    console.log(newPrompt);
    const { success, message } = await createPrompt ( newPrompt );
    console.log(
      `success : ${success}\nmessage : ${message}`
    );
    if(success) {
      showMessage("success", "Your prompt has been created successfully");
      setNewPrompt({name:"", prompt:"", image:""});
    }
    else {
      showMessage("error", "There was an issue creating your prompt");
    }
  }

  const { createPrompt } = usePromptLibrary();

  return (
    <Container
      maxW={"sm"}
    >
      <VStack
        borderSpacing={8}
      >
        <Heading as={'h1'} size={'2xl'} textAlign={"center"} marginBottom={'8'} >
          Create a Prompt
        </Heading>
        {message.text && (
          <Box
            bg={message.type === 'success' ? 'green.500' : 'red.800'}
            color="white"
            p={4}
            rounded="md"
            textAlign="center"
            mb={4}
            transition="opacity 0.5s ease-out"
          >
            {message.text}
          </Box>
        )}
        <Box
          w={'full'}
          bg={useColorModeValue("white", "grey.800")}
          p={6}
          rounded={'lg'}
          shadow={'md'}
        >
          <VStack 
            spacing={8}
          >   
          <Input
            placeholder="Enter your prompt's name here"
            name='name'
            value={newPrompt.name}
            onChange={(e) => setNewPrompt({...newPrompt, name:e.target.value})}
          />
          <Input
            placeholder="Enter your prompt here"
            name='prompt'
            value={newPrompt.prompt}
            onChange={(e) => setNewPrompt({...newPrompt, prompt:e.target.value})}
          />
          <Input
            placeholder="Paste Your Image URL here"
            name='image'
            value={newPrompt.image}
            onChange={(e) => setNewPrompt({...newPrompt, image:e.target.value})}
          />
          <Button colorScheme='blue' onClick={handleAddPrompt} w={'full'}>Create Prompt</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage