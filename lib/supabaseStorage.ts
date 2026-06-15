import { supabase } from './supabase'

export async function getPublicUrl(bucket: string, path: string) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data?.publicUrl ?? null
}

export async function uploadAvatar(file: File, destPath: string, bucket = 'avatars') {
  const { data, error } = await supabase.storage.from(bucket).upload(destPath, file, { upsert: true })
  if (error) throw error
  return data
}

export async function deleteAvatar(path: string, bucket = 'avatars') {
  const { error } = await supabase.storage.from(bucket).remove([path])
  if (error) throw error
  return true
}
