import AppLayout from "@/layouts/app-layout"
import Container from "@/templates/container"
import Lorem from "@/templates/lorem"

export default function Index({ page }) {
    return (
        <AppLayout page={page}>
            <div className="">
                <div className="min-h-[900px]">
                    <Container>
                        <div className="text-light flex flex-col justify-center items-center pt-96 pb-80">
                            <h1 className="text-7xl md:text-9xl font-[900] text-shadow-lg/26">Parrhesia</h1>
                            <p className="text-3xl md:text-6xl text-shadow-lg/30">Collective Academy</p>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <div className="rounded-xl bg-orange-100 shadow-md/20 py-14 w-[90%]">
                                <Container className={'text-center'}>
                                    <h1 className="text-4xl font-bold text-energy text-shadow-lg">Visi Akademika 2028</h1>
                                </Container>
                            </div>
                            <div className="w-[100%] bg-amber-200 rounded-2xl -mt-6 pt-17 pb-12">
                                <Container className={'text-center'}>
                                    <p className="text-3xl">Menggelorakan semangat penelitian untuk perubahan masyarakat yang lebih baik.</p>
                                </Container>
                            </div>
                        </div>
                        <div className="mt-12">
                            <Lorem />
                        </div>
                    </Container>

                </div>
            </div>
        </AppLayout>
    )
}

