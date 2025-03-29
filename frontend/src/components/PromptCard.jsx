import { Box, Button, Heading, Icon, IconButton, Image, HStack } from '@chakra-ui/react'
import React from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const PromptCard = ({prompt}) => {
  return (
    <Box
        shadow={'lg'}
        rounded={'lg'}
        overflow={'hidden'}
        transition={'all 0.3s'}
        _hover={{transform:'translateY(-5px)', shadow:'xl'}}
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
            <Heading as={'h3'} size={'md'} mb={'2'} >
                {prompt.name}
            </Heading>
        </Box>
        <HStack spacing={2} >
            <Button onClick={onOpen} >
              <Icon color={'blue'}>
                <FaEdit />
              </Icon>
            </Button>
            <Button onClick={() => handleDelete(prompt._id)} >
                <Icon color={'red'} >
                    < MdDelete />
                </Icon>
            </Button>
        </HStack>
    </Box>
  )
}

export default PromptCard