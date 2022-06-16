import React, { useCallback } from "react";
import * as d3 from "d3";
import { Box, Text, VStack, useColorModeValue, Button } from "@chakra-ui/react";

import './Stylesheet.css';

import world_json from '../../../assets/geo_definitions/world.json';
import GameMenu from "../../../GameMenu";

const countries: string[] = []
world_json.features.forEach(c => {
    countries.push(c.properties.name);
});
shuffleArray(countries);

function shuffleArray(array: Array<any>) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

interface UnMemberStatesProps {
    increaseScore: () => void,
}

export default function UnMemberStates(props: UnMemberStatesProps) {
    let index = 0;
    let indexRef = React.useRef(index);
    let mistakesVal = 0;
    let skippedVal = 0;
    let skippedValRef = React.useRef(skippedVal);

    const { increaseScore } = props;

    const increaseScoreRef = React.useRef(increaseScore);

    const [menuOpen, setMenuOpen] = React.useState(false);
    const [mistakes, setMistakes] = React.useState(mistakesVal);
    const [nextCountry, setNextCountry] = React.useState(countries[indexRef.current]);
    const [skipped, setSkipped] = React.useState(skippedValRef.current);

    const svgRef: React.MutableRefObject<null | SVGSVGElement> = React.useRef(null);

    const handleGameEnd = useCallback(() => {
        if (indexRef.current >= countries.length) {
            setMenuOpen(true);
        }
    }, [indexRef]);

    const resetGame = () => {
        window.location.reload(); // TODO: Should work correctly at some point.
    };

    React.useEffect(() => {
        const svgEl = d3.select(svgRef.current);
        svgEl.selectAll("*").remove();
        const svg = svgEl
            .append("g");

        const width = svgRef.current?.getBoundingClientRect().width ?? 800;
        const height = svgRef.current?.getBoundingClientRect().height ?? 800;
        const sensitivity = 75;

        let projection = d3.geoOrthographic()
            .scale(250)
            .center([0, 0])
            .rotate([0, -30])
            .translate([width / 2, height / 2]);

        const initialScale = projection.scale();
        let path = d3.geoPath().projection(projection) as any;

        let globe = svg.append("circle")
            .attr("fill", "#EEE")
            .attr("stroke", "#000")
            .attr("stroke-width", "0.2")
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .attr("r", initialScale);

        svg.call(d3.drag<SVGGElement, any>().on('drag', (event) => {
            const rotate = projection.rotate()
            const k = sensitivity / projection.scale()
            projection.rotate([
                rotate[0] + event.dx * k,
                rotate[1] - event.dy * k
            ])
            path = d3.geoPath().projection(projection)
            svg.selectAll("path").attr("d", path)
        }))
            .call(d3.zoom<SVGGElement, any>().on('zoom', (event) => {
                if (event.transform.k > 0.3) {
                    projection.scale(initialScale * event.transform.k)
                    path = d3.geoPath().projection(projection)
                    svg.selectAll("path").attr("d", path)
                    globe.attr("r", projection.scale())
                }
                else {
                    event.transform.k = 0.3
                }
            }));

        let map = svg.append("g");

        let data = world_json;

        map.append("g")
            .attr("class", "land")
            .selectAll("path")
            .data(data.features)
            .enter().append("path")
            .attr("class", d => "countries country_" + d.properties.name.replaceAll(" ", "_"))
            .attr("d", path)
            .style('stroke', 'black')
            .style('stroke-width', 0.3)
            .style("opacity", 0.8)
            .on("click", (e, d) => {
                if (countries[indexRef.current] === d.properties.name) {
                    indexRef.current++;
                    console.log(indexRef.current);
                    handleGameEnd();
                    setNextCountry(countries[indexRef.current]);
                    d3.select(e.target).classed("correctGuess", true);
                    increaseScoreRef.current();
                }
                else {
                    mistakesVal++;
                    setMistakes(mistakesVal);
                }
            });
    }, [
        indexRef,
        mistakesVal,
        handleGameEnd]);

    return <>
        <Box bg={useColorModeValue('gray.100', 'gray.700')}>
            <GameMenu onClose={() => { setMenuOpen(false) }}
                isOpen={menuOpen} 
                onReset={resetGame}
                text={"You completed the game. Do you want to play again?"}></GameMenu>
            <Button position="absolute"
                right={4}
                margin={4}
                colorScheme="orange"
                variant='outline'
                onClick={() => {
                    skippedValRef.current++;
                    setSkipped(skippedValRef.current);
                    d3.select(".country_" + countries[indexRef.current].replaceAll(" ", "_")).classed("skipped", true);
                    indexRef.current++;
                    handleGameEnd();
                    setNextCountry(countries[indexRef.current]);
                }}>Skip</Button>
            <VStack position="absolute"
                padding={4}
                align="start">
                <Text>Find <Text as="span" fontWeight="bold">{nextCountry}</Text>.</Text>
                <Text>You made {mistakes} {mistakes === 1 ? "mistake" : "mistakes"} so far (with {skipped} skipped).</Text>
            </VStack>
            <svg ref={svgRef}
                style={{ display: "block", height: "calc(100vh - 90px)" }}
                width="100%" />
        </Box>
    </>;
}