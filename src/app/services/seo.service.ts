
// seo.service.ts
import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SEOService {
    constructor(private title: Title, private meta: Meta) { }

    updateSEO(title: string, description: string, keywords: string, ogTitle?: string, ogDescription?: string) {
        this.title.setTitle(title);
        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ name: 'keywords', content: keywords });
        if (ogTitle) {
            this.meta.updateTag({ property: 'og:title', content: ogTitle });
        }
        if (ogDescription) {
            this.meta.updateTag({ property: 'og:description', content: ogDescription });
        }
    }
}
