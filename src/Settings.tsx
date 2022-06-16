import { Box, Button, HStack, Icon, List, ListItem, Text, useColorMode, useColorModeValue, VStack } from '@chakra-ui/react';
import { FcSettings } from 'react-icons/fc'

export default function Settings() {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Box padding={4}>
            <Box border='1px'
                bg={useColorModeValue('blue.100', 'blue.800')}
                padding={3}
                borderRadius={5}
                borderColor='gray.200'>
                <VStack align={"start"}>
                    <HStack>
                        <Icon as={FcSettings} fontSize={"x-large"}></Icon>
                        <Text fontSize={"x-large"}>Settings</Text>
                    </HStack>
                    <List spacing={3}>
                        <ListItem>
                            <Button onClick={toggleColorMode}>
                                Use {colorMode === 'light' ? 'Dark' : 'Light'} Mode
                            </Button>
                        </ListItem>
                    </List>
                </VStack>
            </Box>
        </Box>
    );
}