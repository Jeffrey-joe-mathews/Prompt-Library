import { Container, SimpleGrid, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import { usePromptLibrary } from '../store/prompt.js'
import PromptCard from '../components/PromptCard.jsx'

const HomePage = () => {
  
  const { fetchPrompt, prompts } = usePromptLibrary();

  useEffect(() => {
    fetchPrompt();
  }, [fetchPrompt]);

  console.log(`prompts : ${prompts}`);
  

  
  return (
    <Container
      maxW={'xl'}
      py={12}
    >
      <VStack spacing={8} >
      <div
          style={{
            fontSize: '30px',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, cyan, green)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            textAlign: 'center',
          }}
        >
          Prompts * _ *
        </div>
        
         {/* making the components */}
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={'full'}
        >
          {prompts.map((prompt) => (
            <PromptCard key={prompt._id} prompt={prompt} />
          ))}
        </SimpleGrid>

        <div
          style={{
            fontSize: 'xl',
            fontWeight: 'bold',
            color: 'grey',
            textAlign: 'center',
          }}
        >
          No Products Found{" "}
          <Link to={'/create'} >
          <span
          style={{
            fontSize: 'xl',
            fontWeight: 'bold',
            color: 'red',
            textAlign: 'center',
          }}
        >
          Create a Product
        </span>
        </Link>
        </div>
      </VStack>
    </Container>
  )
}

export default HomePage