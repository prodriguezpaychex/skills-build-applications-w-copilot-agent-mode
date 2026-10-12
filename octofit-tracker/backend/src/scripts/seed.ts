import mongoose from 'mongoose';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    console.log('Seed the octofit_db database with test data');
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    const userSeeds = [
      { username: 'alex-runner', email: 'alex@example.com', displayName: 'Alex Runner' },
      { username: 'jordan-cyclist', email: 'jordan@example.com', displayName: 'Jordan Cyclist' },
      { username: 'sam-swimmer', email: 'sam@example.com', displayName: 'Sam Swimmer' },
      { username: 'taylor-hiker', email: 'taylor@example.com', displayName: 'Taylor Hiker' },
    ];
    const users = [];
    for (const userSeed of userSeeds) {
      const user =
        (await User.findOne({ username: userSeed.username }).exec()) ??
        (await User.create(userSeed));
      users.push(user);
    }

    const teamSeeds = [
      {
        name: 'Trailblazers',
        description: 'Outdoor adventurers building healthy habits together.',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Peak Performers',
        description: 'A supportive team focused on steady progress.',
        members: [users[2]._id, users[3]._id],
      },
    ];
    const teams = [];
    for (const teamSeed of teamSeeds) {
      const team =
        (await Team.findOne({ name: teamSeed.name }).exec()) ?? (await Team.create(teamSeed));
      teams.push(team);
    }

    const activitySeeds = [
      {
        user: users[0],
        type: 'Running',
        durationMinutes: 35,
        calories: 320,
        recordedAt: '2026-10-09T08:00:00.000Z',
      },
      {
        user: users[1],
        type: 'Cycling',
        durationMinutes: 50,
        calories: 410,
        recordedAt: '2026-10-09T09:00:00.000Z',
      },
      {
        user: users[2],
        type: 'Swimming',
        durationMinutes: 40,
        calories: 360,
        recordedAt: '2026-10-10T08:00:00.000Z',
      },
      {
        user: users[3],
        type: 'Hiking',
        durationMinutes: 65,
        calories: 470,
        recordedAt: '2026-10-10T09:00:00.000Z',
      },
    ];
    for (const activitySeed of activitySeeds) {
      const recordedAt = new Date(activitySeed.recordedAt);
      const exists = await Activity.findOne({
        user: activitySeed.user._id,
        type: activitySeed.type,
        recordedAt,
      }).exec();
      if (!exists) {
        await Activity.create({ ...activitySeed, user: activitySeed.user._id, recordedAt });
      }
    }

    const leaderboardSeeds = [
      { user: users[0]._id, points: 320, rank: 1 },
      { user: users[1]._id, points: 285, rank: 2 },
      { user: users[2]._id, points: 240, rank: 3 },
      { user: users[3]._id, points: 210, rank: 4 },
      { team: teams[0]._id, points: 605, rank: 1 },
      { team: teams[1]._id, points: 450, rank: 2 },
    ];
    for (const leaderboardSeed of leaderboardSeeds) {
      const exists = await Leaderboard.findOne(leaderboardSeed).exec();
      if (!exists) {
        await Leaderboard.create(leaderboardSeed);
      }
    }

    const workoutSeeds = [
      {
        name: 'Easy Run',
        description: 'A relaxed, conversational-paced run.',
        category: 'Cardio',
        durationMinutes: 30,
        user: users[0]._id,
      },
      {
        name: 'Endurance Ride',
        description: 'A steady ride to build aerobic endurance.',
        category: 'Cycling',
        durationMinutes: 45,
        user: users[1]._id,
      },
      {
        name: 'Lap Technique',
        description: 'A focused session for smooth, efficient strokes.',
        category: 'Swimming',
        durationMinutes: 35,
        user: users[2]._id,
      },
      {
        name: 'Hill Walk',
        description: 'A brisk walk with gentle hill intervals.',
        category: 'Outdoor',
        durationMinutes: 40,
        user: users[3]._id,
      },
    ];
    for (const workoutSeed of workoutSeeds) {
      const exists = await Workout.findOne({
        name: workoutSeed.name,
        user: workoutSeed.user,
      }).exec();
      if (!exists) {
        await Workout.create(workoutSeed);
      }
    }

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();
