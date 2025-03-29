import { Box, Button, Heading, Icon, Image, HStack } from '@chakra-ui/react'
import React from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useColorModeValue } from './ui/color-mode';
import { usePromptLibrary } from '../store/prompt';

const PromptCard = ({prompt}) => {

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const { deletePrompt } = usePromptLibrary();
    const handleDelete = async(pid) => {
        const { success, message } = await deletePrompt(pid);
    }

  return (
    <Box
        shadow={'lg'}
        rounded={'lg'}
        overflow={'hidden'}
        transition={'all 0.3s'}
        _hover={{transform:'translateY(-5px)', shadow:'xl'}}
        bg={bg}
    >
        <Image 
            src={prompt.image} 
            alt='No Image Found' 
            h={48} 
            w={'full'} 
            objectFit={'contain'} 
            filter="grayscale(80%)"
        />
        <Box 
            p={4}
            bg="rgba(0, 0, 0, 0.6)"
            color="white"
        >{prompt.prompt}</Box>
        <Box p={4} >
            <Heading as={'h3'} size={'md'} mb={'2'} color={textColor} >
                {prompt.name}
            </Heading>
        </Box>
        <HStack spacing={2} >
            <Button background={'blue.700'} >
            {/* <Button onClick={onOpen} > */}
              <Icon>
                <FaEdit />
              </Icon>
            </Button>
            <Button  onClick={() => handleDelete(prompt._id)} background={'red.700'} >
            {/* <Button onClick={() => handleDelete(prompt._id)} > */}
                <Icon  >
                    < MdDelete />
                </Icon>
            </Button>
        </HStack>
    </Box>
  )
}

export default PromptCard