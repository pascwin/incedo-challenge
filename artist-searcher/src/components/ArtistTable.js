import { Table } from "react-bootstrap"

import { ArtistRow } from "./ArtistRow.js"

export const ArtistTable = ({ artists }) => {
    return (
        <div className="table-container">
            <Table striped bordered hover size="sm" className="table">
                <thead>
                    <tr>
                        <th>name</th>
                        <th>mbid</th>
                        <th>url</th>
                        <th>image small</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            artists.map((artist, i) => {
                                return <ArtistRow
                                    key={i}
                                    name={artist.name}
                                    mbid={artist.mbid}
                                    url={artist.url}
                                    image={artist.image[0]["#text"]}
                                />
                            })
                        }
                </tbody>
            </Table>
            {
                artists.length === 0 && <h2 className="empty-state">No artists found - search for them!</h2>
            }
        </div>
    )
}