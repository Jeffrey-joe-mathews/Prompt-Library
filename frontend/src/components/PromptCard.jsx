import { Box, Button, Heading, Icon, Image, HStack, VStack, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useColorModeValue } from './ui/color-mode';
import { usePromptLibrary } from '../store/prompt';

const PromptCard = ({ prompt }) => {
    const [updatedPrompt, setUpdatedPrompt] = useState(prompt);
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const { deletePrompt, updatePrompt } = usePromptLibrary();
    const handleDelete = async (pid) => {
        const { success, message } = await deletePrompt(pid);
    }

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleUpdatePrompt = async (pid, prompt) => {
        const {success, message} = await updatePrompt(pid, prompt);
        setIsModalOpen(false);
        console.log(`success : ${success}\nmessage : ${message}`);
        
    }

    return (
        <Box
            shadow={'lg'}
            rounded={'lg'}
            overflow={'hidden'}
            transition={'all 0.3s'}
            _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
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
            <Box p={4}>
                <Heading as={'h3'} size={'md'} mb={'2'} color={textColor} >
                    {prompt.name}
                </Heading>
            </Box>
            <HStack spacing={2} >
                <Button background={'blue.700'} onClick={() => setIsModalOpen(true)}>
                    <Icon>
                        <FaEdit />
                    </Icon>
                </Button>
                <Button onClick={() => handleDelete(prompt._id)} background={'red.700'}>
                    <Icon>
                        <MdDelete />
                    </Icon>
                </Button>
            </HStack>

            {/* Modal Implementation */}
            {isModalOpen && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <div style={styles.modalHeader}>
                            <h2>Update Prompt</h2>
                            <button style={styles.closeButton} onClick={() => setIsModalOpen(false)}>X</button>
                        </div>
                        <div style={styles.modalBody}>
                            <VStack spacing={4}>
                                <Input
                                    placeholder='Prompt Name'
                                    name='name'
                                    value={updatedPrompt.name}
                                    onChange={(e) => setUpdatedPrompt({ ...updatedPrompt, name: e.target.value })}
                                />
                                <Input
                                    placeholder='Prompt'
                                    name='prompt'
                                    value={updatedPrompt.prompt}
                                    onChange={(e) => setUpdatedPrompt({ ...updatedPrompt, prompt: e.target.value })}
                                />
                                <Input
                                    placeholder='Image URL'
                                    name='image'
                                    value={updatedPrompt.image}
                                    onChange={(e) => setUpdatedPrompt({ ...updatedPrompt, image: e.target.value })}
                                />
                            </VStack>
                        </div>
                        <div style={styles.modalFooter}>
                            <Button
                                colorScheme='blue'
                                onClick={() => handleUpdatePrompt(prompt._id, updatedPrompt)}
                            >
                                Update
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </Box>
    );
};

// Inline CSS styles
const styles = {
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    },
    modalContent: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '400px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        position: 'relative'
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
    },
    closeButton: {
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
        color: 'gray'
    },
    modalBody: {
        marginBottom: '16px'
    },
    modalFooter: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
};

export default PromptCard;
