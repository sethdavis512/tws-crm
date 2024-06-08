```sql
CREATE POLICY "Authenticated users can delete"
ON customer
FOR DELETE
TO authenticated
USING (auth.uid() IS NOT NULL);
```
