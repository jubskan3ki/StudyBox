import type { PictureProps } from '~/types/components/common/picture.interface';

function Picture({ className, webpSrc, fallbackSrc, alt }: PictureProps) {
    return (
        <picture className={className}>
            <source type="image/webp" srcSet={webpSrc} />
            <source srcSet={fallbackSrc} />
            <img src={fallbackSrc} alt={alt} />
        </picture>
    );
}

export default Picture;
