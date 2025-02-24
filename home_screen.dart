
import 'package:flutter/material.dart';
import 'package:movie_app/widgets/movie_list.dart';
import 'package:movie_app/widgets/series_list.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Movie & Series App'),
        actions: [
          IconButton(
            icon: Icon(Icons.search),
            onPressed: () {
              // إضافة وظيفة البحث هنا
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(
                'الأفلام',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
            ),
            MovieList(),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(
                'المسلسلات',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
            ),
            SeriesList(),
          ],
        ),
      ),
    );
  }
}
