import React from "react";
import { InputGroup, FormControl, Row, Col, Button } from "react-bootstrap";

export const SearchBox = ({ searchfield, searchForArtists }) => {
    return (
        <div className="pa2">
            <Row>
                <Col md={4}>
                    <InputGroup className="mb-3 search-container">
                        <FormControl
                            id="searchfield"
                            placeholder="search for Artists"
                        />
                        <Button variant="primary" onClick={searchForArtists}>Primary</Button>
                    </InputGroup>
                </Col>
                <Col md={4} />

                <Col md={4} />
            </Row>

        </div>
    )
}