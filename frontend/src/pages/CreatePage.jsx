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

  const handleAddPrompt = async() => {
    console.log(newPrompt);
    const { success, message } = await createPrompt ( newPrompt );
    console.log(
      `success : ${success}\nmessage : ${message}`
    );
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