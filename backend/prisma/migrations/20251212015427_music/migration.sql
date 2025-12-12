-- CreateTable
CREATE TABLE "artist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "spotify_id" TEXT,
    "apple_id" TEXT,
    "mb_id" TEXT,
    "canonical" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "album" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "artist_id" TEXT NOT NULL,
    "spotify_id" TEXT,
    "apple_id" TEXT,
    "mb_id" TEXT,
    "canonical" BOOLEAN NOT NULL DEFAULT true,
    "released" TIMESTAMP(3),

    CONSTRAINT "album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "track" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "artist_id" TEXT NOT NULL,
    "spotify_id" TEXT,
    "apple_id" TEXT,
    "mb_id" TEXT,
    "canonical" BOOLEAN NOT NULL DEFAULT true,
    "released" TIMESTAMP(3),
    "duration" INTEGER,

    CONSTRAINT "track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_album_tracks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_album_tracks_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "artist_spotify_id_key" ON "artist"("spotify_id");

-- CreateIndex
CREATE UNIQUE INDEX "artist_apple_id_key" ON "artist"("apple_id");

-- CreateIndex
CREATE UNIQUE INDEX "artist_mb_id_key" ON "artist"("mb_id");

-- CreateIndex
CREATE UNIQUE INDEX "album_spotify_id_key" ON "album"("spotify_id");

-- CreateIndex
CREATE UNIQUE INDEX "album_apple_id_key" ON "album"("apple_id");

-- CreateIndex
CREATE UNIQUE INDEX "album_mb_id_key" ON "album"("mb_id");

-- CreateIndex
CREATE UNIQUE INDEX "track_spotify_id_key" ON "track"("spotify_id");

-- CreateIndex
CREATE UNIQUE INDEX "track_apple_id_key" ON "track"("apple_id");

-- CreateIndex
CREATE UNIQUE INDEX "track_mb_id_key" ON "track"("mb_id");

-- CreateIndex
CREATE INDEX "_album_tracks_B_index" ON "_album_tracks"("B");

-- AddForeignKey
ALTER TABLE "album" ADD CONSTRAINT "album_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "track" ADD CONSTRAINT "track_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_album_tracks" ADD CONSTRAINT "_album_tracks_A_fkey" FOREIGN KEY ("A") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_album_tracks" ADD CONSTRAINT "_album_tracks_B_fkey" FOREIGN KEY ("B") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
