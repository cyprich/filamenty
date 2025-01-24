import PropTypes from "prop-types";

function Filaments({filaments}) {
    return (
        <div style={{display: "grid", justifyContent: "center", gridTemplateColumns: "repeat(5, 1fr)", gap: "32px"}}>
            {filaments.map((item, key) => {
                return (
                    <div key={key} style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "32px",
                        alignItems: "center",
                        border: "1px solid black",
                        borderRadius: "32px 0",
                        padding: "24px",
                        filter: `grayscale(${item.weight === 0 ? "100" : "0"}) blur(${item.weight === 0 ? "1px" : "0"})`,
                        scale: `${item.weight === 0 ? "0.9" : "1"}`
                    }}>
                        <img style={{width: "100%", aspectRatio: "auto", borderRadius: "inherit"}}
                             src={`http://localhost:5000/api/images/filamenty/${item.id}.png`} alt=""/>
                        <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <p style={{ width: "max-content"}}>{Math.max(item.weight - item.weight_spool, 0)} g left</p>
                            <div style={{
                                // width: "90%",
                                width: `${item.weight / item.weight_orig * 0.9 * 100}%`,
                                height: "3px",
                                background: `linear-gradient(to right, ${item.color_hex}, ${item.color_second_hex || item.color_hex})`,
                                marginBottom: "-8px"
                            }}/>
                        </div>
                        <div style={{width: "95%"}}>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <h2>{item.vendor}</h2>
                                <h2 className={"dimmed-text"}>#{item.id + 1}</h2>
                            </div>
                            <h3 style={{fontWeight: "500"}}>{item.material}</h3>
                            <table style={{paddingTop: "8px"}}>
                                <tbody>
                                <tr>
                                    <td>Temp</td>
                                    <td> : {item.temp_min} - {item.temp_max} °C</td>
                                </tr>
                                <tr>
                                    <td>Bed</td>
                                    <td> : {item.temp_bed_min} {item.temp_bed_max ? `- ${item.temp_bed_max}` : ""} °C</td>
                                </tr>
                                <tr>
                                    <td>Weight</td>
                                    <td> : {item.weight_orig / 1000} kg</td>
                                </tr>
                                <tr>
                                    <td>Spool</td>
                                    <td> : {item.weight_spool} g</td>
                                </tr>
                                <tr>
                                    <td>Price</td>
                                    <td> : {(item.price / (item.weight_orig / 1000)).toFixed(2)} €/kg</td>
                                </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

Filaments.propTypes = {
    filaments: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        vendor: PropTypes.string.isRequired,
        material: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        color_hex: PropTypes.string.isRequired,
        color_second_hex: PropTypes.string,
        weight: PropTypes.number.isRequired,
        weight_orig: PropTypes.number.isRequired,
        weight_spool: PropTypes.number.isRequired,
        temp_min: PropTypes.number.isRequired,
        temp_max: PropTypes.number.isRequired,
        temp_bed_min: PropTypes.number.isRequired,
        temp_bed_max: PropTypes.number,
    })).isRequired
};

export default Filaments