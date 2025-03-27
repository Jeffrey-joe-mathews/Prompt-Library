import { Button, Container, Flex, HStack, Icon, Link, Text } from '@chakra-ui/react'
import React from 'react'
import { CiSquarePlus } from "react-icons/ci";
import { FaCloudMoon, FaCloudSun } from "react-icons/fa";
import { useColorMode } from './ui/color-mode';

const Navbar = () => {

  const {colorMode, toggleColorMode} = useColorMode();

  return (
    <Container maxW={"1140px"} px={4} >
      <Flex 
        h={16} 
        alignItems={"center"} 
        justifyContent={"space-between"} 
        flexDir={{
          base:"column",
          sm:"row"
        }} 
      >
        <Text
          fontSize={{base:22, sm:24}}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          // color={'green.400'}
          // bgGradient={"linear(to-l, #7928CA, #FF0080)"}
          // bgGradient="to-r" gradientFrom={'cyan.400'} gradientTo={'blue.600'}
          bgClip={"text"}
        >
          <Link 
            href='/' 
            color={'green.500'}
            // bgGradient={"linear(to-l, #7928CA, #FF0080)"}
            // bgGradient={"to -r"} gradientFrom={'cyan.400'} gradientTo={'blue.500'}
          >
          Prompt Library
          </Link>
        </Text>
        <HStack borderSpacing={2} alignItems={"center"} >
          <Link href='/create' >
            <Button>
              <Icon>
                <CiSquarePlus />
              </Icon>
            </Button>

            <Button onClick={toggleColorMode} >
              {colorMode ==="light"? <FaCloudMoon /> : < FaCloudSun size={40} /> }
            </Button>
          </Link>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar