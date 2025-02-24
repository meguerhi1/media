import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl = 'http://your-server-address'; // استبدل بعنوان الخادم

  // استرجاع الأفلام
  static Future<List<dynamic>> getMovies() async {
    final response = await http.get(Uri.parse('$baseUrl/get_movies.php'));
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load movies');
    }
  }

  // استرجاع المسلسلات
  static Future<List<dynamic>> getSeries() async {
    final response = await http.get(Uri.parse('$baseUrl/get_series.php'));
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load series');
    }
  }

  // البحث
  static Future<List<dynamic>> search(String query) async {
    final response = await http.get(Uri.parse('$baseUrl/search.php?query=$query'));
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to search');
    }
  }

  // إضافة تقييم
  static Future<void> addRating(String id, double rating, String type) async {
    final response = await http.post(
      Uri.parse('$baseUrl/add_rating.php'),
      body: {
        'id': id,
        'rating': rating.toString(),
        'type': type,
      },
    );
    if (response.statusCode != 200) {
      throw Exception('Failed to add rating');
    }
  }
}
