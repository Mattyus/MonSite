export class Photo {
    _id: string;
    album: string;
    titre: string;
    nom: string;
    tags: [{ display: string; value: string }];
    date: Date;
    utilisateur: string;
}
