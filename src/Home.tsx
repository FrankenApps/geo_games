import { Box, HStack, Icon, Link, List, ListItem, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from "react-router-dom";

import { FcGlobe } from 'react-icons/fc'

export default function Home() {
    return (
        <Box padding={4}>
            <Box border='1px'
                bg={useColorModeValue('blue.100', 'blue.800')}
                padding={3}
                borderRadius={5}
                borderColor='gray.200'>
                <VStack align={"start"}>
                    <HStack>
                        <Icon as={FcGlobe} fontSize={"x-large"}></Icon>
                        <Text fontSize={"x-large"}>World</Text>
                    </HStack>
                    <List spacing={3}>
                        <ListItem>
                            <Text>
                                All&nbsp;
                                <Link color='teal.500'
                                    as={RouterLink}
                                    to="/games/world/un-member-states">
                                    192 UN Member States
                                </Link>
                            </Text>
                        </ListItem>
                    </List>
                </VStack>

            </Box>
        </Box>
    );
}