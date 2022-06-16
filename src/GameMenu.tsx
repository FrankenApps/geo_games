import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

interface GameMenuProps {
    isOpen: boolean,
    onClose: () => void,
    onReset: () => void,
    text: string,
}

export default function GameMenu(props: GameMenuProps) {
    const { isOpen, onClose, onReset, text } = props;

    const cancelRef: any = React.useRef();

    return (
        <>
            <AlertDialog
                motionPreset="slideInBottom"
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}>
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Congratulations</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        {text}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button onClick={onClose}
                            as={RouterLink}
                            to="/">
                            No
                        </Button>
                        <Button ref={cancelRef}
                            onClick={() => { 
                                onClose(); 
                                onReset(); 
                            }}
                            colorScheme="blue" ml={3}>
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}