export default async function home() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs')
    }
    // await this.load();
    this.partial('../templates/home.hbs');
    
}