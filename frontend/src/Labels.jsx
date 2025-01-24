import PropTypes from "prop-types";

function Labels({filaments}) {
    return (
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", justifyItems: "center", gap: "32px 0"}}>
            {filaments.map((item, key) => (
                <div key={key} style={{scale: "0.9", display: "flex", alignItems: "center", gap: "48px", border: "1px solid black", padding: "32px", width: "max-content"}}>
                    <div className={"label"} style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1em",
                    }}>
                        <div style={{display: "flex", alignItems: "center", gap: "24px", width: "max-content"}}>
                            <div
                                style={{
                                    background: `linear-gradient(135deg, ${item.color_hex}, ${item.color_second_hex || item.color_hex})`,
                                    width: "72px",
                                    height: "72px",
                                    borderRadius: "50%",
                                }}
                            />
                            <div style={{display: "flex", flexDirection: "column", gap: "0px"}}>
                                <h2>{item.material}
                                    <span className={"dimmed-text"} style={{paddingLeft: "16px",}}>#{item.id + 1}</span>
                                </h2>
                                <p>{item.vendor}</p>
                            </div>
                        </div>
                        <table>
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
                    <img src={`http://localhost:5000/api/images/qr/${item.id}.png`} alt="" style={{width: "12em", height: "12em", padding: "16px"}}/>
                </div>
            ))}
        </div>
    );
}

Labels.propTypes = {
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


export default Labels;

