        // تهيئة مشغل الفيديو
        const player = videojs('my-video');

        // بيانات المواسم والحلقات
        const seasons = [
            {
                title: "الموسم الأول",
                episodes: []
            },
            {
                title: "الموسم الثاني",
                episodes: []
            }
        ];

        // إضافة الحلقات إلى المواسم
        for (let i = 1; i <= 1; i++) {
            seasons[0].episodes.push({ title: `الحلقة ${i}`, src: `videos/season1/episode${i}.mp4` });
        }
        for (let i = 1; i <= 1; i++) {
            seasons[1].episodes.push({ title: `الحلقة ${i}`, src: `videos/season2/episode${i}.mp4` });
        }

        let currentSeasonIndex = 0; // الفهرس الحالي للموسم
        let currentPage = 1; // الصفحة الحالية
        const episodesPerPage = 12; // عدد الحلقات في كل صفحة

        // دالة لعرض الحلقات بناءً على الموسم والصفحة الحالية
        function displayEpisodes() {
            const episodesTable = document.getElementById('episodesTable');
            episodesTable.innerHTML = ''; // مسح المحتوى القديم

            const currentSeason = seasons[currentSeasonIndex];
            const startIndex = (currentPage - 1) * episodesPerPage;
            const endIndex = startIndex + episodesPerPage;
            const episodesToShow = currentSeason.episodes.slice(startIndex, endIndex);

            let row = document.createElement('tr');
            episodesToShow.forEach((episode, index) => {
                if (index % 6 === 0 && index !== 0) {
                    episodesTable.appendChild(row);
                    row = document.createElement('tr');
                }
                const cell = document.createElement('td');
                cell.textContent = episode.title;
                cell.onclick = () => playEpisode(episode.src);
                row.appendChild(cell);
            });
            episodesTable.appendChild(row);

            // تحديث حالة أزرار التصفح
            const totalPages = Math.ceil(currentSeason.episodes.length / episodesPerPage);
            document.getElementById('prevButton').disabled = currentPage === 1;
            document.getElementById('nextButton').disabled = currentPage === totalPages;
        }

        // دالة لتغيير الموسم
        function changeSeason() {
            currentSeasonIndex = document.getElementById('seasonSelect').selectedIndex;
            currentPage = 1;
            displayEpisodes();
        }

        // دالة للانتقال إلى الصفحة السابقة
        function prevPage() {
            if (currentPage > 1) {
                currentPage--;
                displayEpisodes();
            }
        }

        // دالة للانتقال إلى الصفحة التالية
        function nextPage() {
            const currentSeason = seasons[currentSeasonIndex];
            const totalPages = Math.ceil(currentSeason.episodes.length / episodesPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                displayEpisodes();
            }
        }

        // دالة لتشغيل الحلقة المحددة
        function playEpisode(src) {
            player.src({
                src: src,
                type: src.endsWith('.m3u8') ? 'application/x-mpegURL' : 'video/mp4'
            });
            player.play();
            toggleEpisodesList(); // إغلاق القائمة بعد التشغيل
        }

        // دالة لإظهار/إخفاء قائمة الحلقات
        function toggleEpisodesList() {
            const episodesList = document.getElementById('episodesList');
            episodesList.classList.toggle('show');
        }

        // دالة لتصفية الحلقات بناءً على البحث
        function filterEpisodes() {
            const searchText = document.getElementById('searchBar').value.toLowerCase();
            const currentSeason = seasons[currentSeasonIndex];
            const filteredEpisodes = currentSeason.episodes.filter(episode => episode.title.toLowerCase().includes(searchText));
            const totalFilteredPages = Math.ceil(filteredEpisodes.length / episodesPerPage);

            if (currentPage > totalFilteredPages) {
                currentPage = totalFilteredPages || 1;
            }

            displayEpisodes();
        }

        // دالة للبحث عن حلقة محددة باستخدام رقم الحلقة
        function searchEpisode() {
            const searchText = document.getElementById('searchBar').value.trim();
            if (!searchText) return; // إذا كان البحث فارغًا

            const episodeNumber = parseInt(searchText, 10);
            if (isNaN(episodeNumber)) return; // إذا لم يكن رقمًا

            const currentSeason = seasons[currentSeasonIndex];
            const episode = currentSeason.episodes.find(ep => ep.title.includes(`الحلقة ${episodeNumber}`));

            if (episode) {
                playEpisode(episode.src); // تشغيل الحلقة إذا وجدت
            } else {
                alert("الحلقة غير موجودة!"); // إظهار رسالة خطأ إذا لم توجد الحلقة
            }
        }

        // دالة للتعامل مع الضغط على زر Enter في شريط البحث
        function handleSearchKeyPress(event) {
            if (event.key === "Enter") {
                searchEpisode();
            }
        }

        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', (event) => {
            const episodesList = document.getElementById('episodesList');
            const episodesIcon = document.querySelector('.episodes-icon');
            if (!episodesList.contains(event.target) && !episodesIcon.contains(event.target)) {
                episodesList.classList.remove('show');
            }
        });

        // تعبئة قائمة المواسم
        const seasonSelect = document.getElementById('seasonSelect');
        seasons.forEach((season, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = season.title;
            seasonSelect.appendChild(option);
        });

        // عرض الحلقات عند تحميل الصفحة
        displayEpisodes();