import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { FaPlay, FaPause, FaExpand, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

const videos = [
    {
        id: 1,
        title: "Bocuse d'Or Competition Highlights",
        titleAr: "أبرز مسابقة بوكوز دور",
        description: "Watch the intense moments from the world's most prestigious culinary competition in Lyon, France.",
        thumbnail: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&h=675&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // Placeholder
        duration: "5:24",
        category: "Competition"
    },
    {
        id: 2,
        title: "Signature Dish: Moroccan Lamb Tagine",
        titleAr: "الطبق المميز: طاجين لحم الضأن المغربي",
        description: "Step-by-step preparation of the signature lamb tagine with preserved lemons and olives.",
        thumbnail: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=1200&h=675&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", // Placeholder
        duration: "8:15",
        category: "Cooking Demo"
    },
    {
        id: 3,
        title: "Behind the Scenes at Conrad Rabat",
        titleAr: "خلف الكواليس في كونراد الرباط",
        description: "A day in the life of an Chef managing a 5-star luxury hotel kitchen.",
        thumbnail: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=675&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", // Placeholder
        duration: "12:30",
        category: "Behind the Scenes"
    },
    {
        id: 4,
        title: "Pigeon Pastilla Masterclass",
        titleAr: "درس متقدم في بسطيلة الحمام",
        description: "Learn the traditional technique of creating the perfect pastilla with 24 layers of phyllo.",
        thumbnail: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1200&h=675&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", // Placeholder
        duration: "15:45",
        category: "Cooking Demo"
    }
];

const VideoShowcase = () => {
    const { t } = useLanguage();
    const [selectedVideo, setSelectedVideo] = useState(videos[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleMuteToggle = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleFullscreen = () => {
        if (videoRef.current) {
            if (videoRef.current.requestFullscreen) {
                videoRef.current.requestFullscreen();
            }
        }
    };

    const handleVideoSelect = (video) => {
        setSelectedVideo(video);
        setIsPlaying(false);
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    return (
        <section className="section-padding bg-[#0A0A0A] relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#C9A961]/5 to-transparent" />
            </div>

            <div className="container relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <motion.div
                            className="w-12 h-[1px] bg-[#C9A961]"
                            initial={{ width: 0 }}
                            whileInView={{ width: 48 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        />
                        <span className="text-[#C9A961] text-xs uppercase tracking-[0.2em] font-medium">
                            {t('video.label')}
                        </span>
                        <motion.div
                            className="w-12 h-[1px] bg-[#C9A961]"
                            initial={{ width: 0 }}
                            whileInView={{ width: 48 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        />
                    </div>
                    <h3 className="font-arabic text-[#C9A961] md:font-bold mb-6 text-center text-6xl md:text-7xl lg:text-8xl" dir="rtl">

                        {t('video.titleArabic')}
                    
</h3>
                    <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
                        {t('video.description')}
                    </p>
                </motion.div>

                {/* Main Video Player */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className="relative h-[400px] md:h-[500px] bg-black border-2 border-[#C9A961]/30 overflow-hidden group">
                        {/* Video Element */}
                        <video
                            ref={videoRef}
                            src={selectedVideo.videoUrl}
                            poster={selectedVideo.thumbnail}
                            className="w-full h-full object-cover"
                            muted={isMuted}
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                        />

                        {/* Custom Controls Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {/* Play/Pause Button */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.button
                                    onClick={handlePlayPause}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-20 h-20 bg-[#C9A961] text-black rounded-full flex items-center justify-center hover:bg-[#B8935A] transition-colors"
                                >
                                    {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} className="ml-1" />}
                                </motion.button>
                            </div>

                            {/* Bottom Controls */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center justify-between">
                                <div className="flex-1">
                                    <h3 className="text-white font-display text-xl mb-1">{selectedVideo.title}</h3>
                                    <p className="text-gray-400 text-sm">{selectedVideo.description}</p>
                                </div>
                                <div className="flex items-center gap-3 ml-6">
                                    <button
                                        onClick={handleMuteToggle}
                                        className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors"
                                    >
                                        {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
                                    </button>
                                    <button
                                        onClick={handleFullscreen}
                                        className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors"
                                    >
                                        <FaExpand size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-6 left-6 bg-[#C9A961] text-black px-4 py-2 text-xs uppercase tracking-wider font-semibold">
                            {selectedVideo.category}
                        </div>

                        {/* Duration Badge */}
                        <div className="absolute top-6 right-6 bg-black/70 text-white px-3 py-1 text-sm font-medium">
                            {selectedVideo.duration}
                        </div>
                    </div>
                </motion.div>

                {/* Video Thumbnails Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {videos.map((video, index) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            onClick={() => handleVideoSelect(video)}
                            className={`group relative cursor-pointer overflow-hidden border-2 transition-all duration-300 ${selectedVideo.id === video.id
                                ? 'border-[#C9A961]'
                                : 'border-white/10 hover:border-[#C9A961]/50'
                                }`}
                        >
                            {/* Thumbnail */}
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                                {/* Play Icon */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 bg-[#C9A961]/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <FaPlay className="text-black ml-1" size={16} />
                                    </div>
                                </div>

                                {/* Duration */}
                                <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 text-xs font-medium">
                                    {video.duration}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-4 bg-[#111111]">
                                <h4 className="text-white text-sm font-display mb-1 line-clamp-2 group-hover:text-[#C9A961] transition-colors">
                                    {video.title}
                                </h4>
                                <p className="text-gray-500 text-xs uppercase tracking-wide">
                                    {video.category}
                                </p>
                            </div>

                            {/* Active Indicator */}
                            {selectedVideo.id === video.id && (
                                <div className="absolute top-0 left-0 right-0 h-1 bg-[#C9A961]" />
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Note about placeholder */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <p className="text-gray-600 text-sm italic">
                        {t('video.placeholderNote')}
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default VideoShowcase;
