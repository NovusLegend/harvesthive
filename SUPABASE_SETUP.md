# Supabase Storage Setup Instructions

## Required Setup in Supabase Dashboard

Before uploading images, you need to create a storage bucket in your Supabase project:

### Steps:

1. Go to your Supabase dashboard: https://app.supabase.com
2. Select your project (ldvyjmrxvdxuosxkhnah)
3. Navigate to **Storage** in the left sidebar
4. Click **"Create a new bucket"**
5. Name the bucket: `product-images`
6. Set bucket as **Public** (so images can be accessed publicly)
7. Click **"Create bucket"**

### Bucket Policies (Optional - for better security)

If you want to add custom policies:

```sql
-- Allow public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'product-images' );

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'product-images' );

-- Allow users to update their own images
CREATE POLICY "Users can update own images"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'product-images' );
```

## Environment Variables

The `.env` file has been created with your credentials:
- `REACT_APP_SUPABASE_URL`
- `REACT_APP_SUPABASE_ANON_KEY`

**Important**: Make sure `.env` is in your `.gitignore` to keep credentials secure!

## Testing Image Upload

1. Complete the Supabase bucket setup above
2. Login to your app
3. Navigate to "Post Product"
4. Try uploading an image
5. If successful, the image URL will be stored in Firestore and displayed on product cards
