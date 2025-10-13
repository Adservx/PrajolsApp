import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchStudents } from '../../store/slices/studentSlice';
import { Card } from '../../components/Card';
import { Avatar } from '../../components/Avatar';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { EmptyState } from '../../components/EmptyState';
import { Student } from '../../types';
import { spacing, fontSize, fontWeight } from '../../utils/theme';

const StudentListScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { students, isLoading } = useAppSelector((state) => state.students);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = students.filter(
        (student) =>
          student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(students);
    }
  }, [searchQuery, students]);

  const renderStudentItem = ({ item }: { item: Student }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('StudentDetail', { studentId: item.id })}
    >
      <Card style={styles.studentCard}>
        <View style={styles.studentInfo}>
          <Avatar
            source={item.avatar}
            firstName={item.firstName}
            lastName={item.lastName}
            size="medium"
          />
          <View style={styles.studentDetails}>
            <Text style={styles.studentName}>
              {item.firstName} {item.lastName}
            </Text>
            <Text style={styles.studentId}>ID: {item.studentId}</Text>
            <View style={styles.studentMeta}>
              <View style={styles.metaItem}>
                <Ionicons name="book-outline" size={14} color="#6B7280" />
                <Text style={styles.metaText}>
                  Grade {item.grade}-{item.section}
                </Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="mail-outline" size={14} color="#6B7280" />
                <Text style={styles.metaText}>{item.email}</Text>
              </View>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
        </View>
      </Card>
    </TouchableOpacity>
  );

  if (isLoading) {
    return <LoadingSpinner fullScreen message="Loading students..." />;
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search students..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9CA3AF"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>

      {/* Students List */}
      {filteredStudents.length === 0 ? (
        <EmptyState
          icon="people-outline"
          title="No students found"
          message={searchQuery ? 'Try a different search term' : 'Add students to get started'}
          actionText="Add Student"
          onAction={() => {}}
        />
      ) : (
        <FlatList
          data={filteredStudents}
          renderItem={renderStudentItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Add Button */}
      <TouchableOpacity style={styles.fab} onPress={() => {}}>
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: spacing.lg,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: spacing.md,
    fontSize: fontSize.md,
    color: '#111827',
  },
  listContent: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  studentCard: {
    marginBottom: spacing.md,
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  studentDetails: {
    flex: 1,
    marginLeft: spacing.md,
  },
  studentName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: '#111827',
    marginBottom: spacing.xs,
  },
  studentId: {
    fontSize: fontSize.sm,
    color: '#6B7280',
    marginBottom: spacing.sm,
  },
  studentMeta: {
    gap: spacing.xs,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: fontSize.xs,
    color: '#6B7280',
  },
  fab: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default StudentListScreen;
