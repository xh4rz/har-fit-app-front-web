interface VideoPlayerProps {
	url: string;
}

export const VideoPlayer = ({ url }: VideoPlayerProps) => {
	return (
		<video
			className="max-w-full max-h-full object-contain"
			autoPlay
			loop
			muted
			playsInline
		>
			<source src={url} type="video/mp4" />
		</video>
	);
};
