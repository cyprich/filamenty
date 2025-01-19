function Labels({filaments}) {
    return (
        <div>
            {filaments.map((item, key) => (
                <div key={key} style={{padding: "24px"}}>
                    <div style={{
                        background: `linear-gradient(135deg, ${item.color_hex}, ${item.color_second_hex || item.color_hex})`,
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%"
                    }}/>
                    <p>{item.vendor} {item.material}</p>
                </div>
            ))}
        </div>
    )
}

export default Labels