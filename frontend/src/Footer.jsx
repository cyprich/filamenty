function Footer() {
    return (
        <footer className={"flex justify-center items-center gap-10 p-8 bg-zinc-950"}>
            <div className={"flex flex-col justify-center items-end gap-1"}>
                <a className={"!text-3xl !font-semibold"} href="https://github.com/cyprich/filamenty.git" target={"_blank"}>Filamenty</a>
                <p>© 2025</p>
            </div>
            <div className={"flex flex-col"}>
                <h3 className={"!font-medium"}>Peter Cyprich</h3>
                <a href={"mailto:cypooriginal@gmail.com"} target={"_blank"}>cypooriginal@gmail.com</a>
                <a href={"mailto:cyprich6@stud.uniza.sk"} target={"_blank"}>cyprich6@stud.uniza.sk</a>
            </div>
        </footer>
    )
}

export default Footer;